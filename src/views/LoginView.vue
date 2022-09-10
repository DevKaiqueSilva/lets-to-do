<template>
	<v-layout fill-height justify-center align-center class="login">
		<v-flex xs12 sm8 md6 lg4 class="px-2" style="max-width: 500px; margin: auto">
			<v-card class="login-area" elevation="5">
				<div class="login-title">LET'S DO IT!</div>
				<v-form :disabled="loading" ref="refFormLogin" @submit.prevent="()=>{}">
					<v-text-field 
						v-model="user" label="Usuário" prepend-inner-icon="mdi-account"
						placeholder="Digite aqui seu usuário" outlined hide-details 
						class="my-4" :rules="[rules.required]" validate-on-blur 
						@keydown="onKeyLogin($event, 'user')"
					/>
					<v-text-field 
						v-model="password" prepend-inner-icon="mdi-lock" label="Senha" 
						placeholder="Digite aqui sua senha" outlined ref="refPassword"
						:type="showPassword ? 'text' : 'password'"
						:append-icon="showPassword == false ? 'mdi-eye' : 'mdi-eye-off'" 
						class="my-4" :rules="[rules.required]" validate-on-blur
						@click:append="showPassword=!showPassword" hide-details
						@keydown="onKeyLogin($event, 'password')"
					/>
				</v-form>
				<v-layout justify-end>
					<v-checkbox v-model="keepConected" label="Manter Conectado" class="ma-0" hide-details />
				</v-layout>
				<v-btn 
					v-if="loginSuccessful==false" block color="color3" :disabled="loading" :loading="loading" 
					class="mt-4 white--text" height="50" 
					@click="onLogin"
				>
					ACESSAR
				</v-btn>
				<v-layout v-else justify-center align-center>
					<v-avatar class="mx-auto mt-4 login-success" size="70" color="green">
						<v-icon color="white" size="30">mdi-check-bold</v-icon>
					</v-avatar>
				</v-layout>
			</v-card>
			<div class="text-center white--text body-2 mt-4" style="opacity:0.8">
				Precisa de alguma ajuda?<br/>
				<v-btn 
					color="green" small class="mt-2 white--text" target="_blank"
					:href="`https://api.whatsapp.com/send?phone=${5515991106262}&text=Olá, gostaria de falar sobre o *Let's do it!*.`"
				>
					<v-icon class="mr-2" color="white">mdi-whatsapp</v-icon>ENTRAR EM CONTATO
				</v-btn>
			</div>
		</v-flex>
	</v-layout>
</template>

<script>
import axios from "axios";

export default {
	data(){
		return {
			user: "",
			password: "",
			showPassword: false,
			keepConected: false,
			loginSuccessful: false,
			loading: false,
			rules: {
				required: v =>  !!v || "Preencha o campo"
			}
		};
	},
	methods: {
		onKeyLogin(e, field){
			if(e.keyCode == 13){
				if(field == "user"){
					if(this.$refs.refPassword) this.$refs.refPassword.focus();
				}else{
					this.onLogin();
				}
			}
		},
		async onLogin(){
			if(this.$refs.refPassword) this.$refs.refPassword.blur();
			if(this.$refs.refFormLogin.validate()){
				//logged
				this.loading = true;
				try{
					let { status, data } = await axios.post("/api/login",{
						user: this.user,
						password: this.password
					});
					console.log(status, data);
					if(status == 200 && data){
						this.loginSuccessful = true;
						if(this.keepConected){
							localStorage.setItem("keepConected", 1);
						}
						localStorage.setItem("logged", 1);
						this.$store.dispatch("setSnackbar", {
							visible: true,
							text: "Login realizado com sucesso.",
							color: "green"
						});
						setTimeout(() => {
							this.$router.push("/");
						}, 3000);
					}else{
						throw "";
					}
				}catch(err){	
					this.$store.dispatch("setSnackbar", {
						visible: true,
						text: "Falha ao realizar login. Usuário e/ou senha incorretos.",
						color: "red"
					});
				}
				setTimeout(() => {
					this.loading = false;
				}, 1000);
			}else{
				//error
				this.$store.dispatch("setSnackbar", {
					visible: true,
					text: "Preencha os campos",
					color: "red"
				});
			}
		}
	}
}
</script>

<style lang="sass" scoped>
.login
	background-color: var(--v-color1-base)
	&-area
		padding: 20px
		padding-top: 30px
	&-title
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
		color: var(--v-color3-base)
		font-size: 4.5rem
		width: calc(100% - 40px)
		position: absolute
		top: -60px
		text-align: center
		font-weight: bold
		-webkit-text-stroke: 1px white
	&-success
		animation: pulse 2s 0.5s infinite
		@keyframes pulse 
			0%
				transform: scale(1)
			50%
				transform: scale(1.2)
				opacity: 0.7
			100%
				transform: scale(1)

</style>