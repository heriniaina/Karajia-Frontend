<template>
    <h1>Sign in</h1>
    <p v-if="errMsg">{{ errMsg }}</p>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" name="email" id="email" aria-describedby="emailhelp"
            placeholder="Votre email" v-model="email">
        <small id="emailhelp" class="form-text text-muted">Insérer l'email</small>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" id="password" aria-describedby="passHelp" placeholder=""
            v-model="password">
        <small id="passHelp" class="form-text text-muted">Your password</small>
    </div>
    <button type="button" @click="signin" class="btn btn-primary">Sign in</button>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")
const errMsg = ref("")
const router = useRouter()

const signin = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
        console.log("Successfully registered");
        router.push('/feed') //redirect
    }).catch((error) => {
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Invalid email"
                break;
            case "auth/user-not-found":
                errMsg.value = "User not found"
                break;
            case "auth/wrong-password":
                errMsg.value = "Wrong password"
                break;
            case "auth/network-request-failed":
                errMsg.value = "Network error"
                break;
            default:
                errMsg.value = "Email or password incorrect"
                alert(error.message);
                break;
        }
        console.log(error.code);
        
    })

}

</script>