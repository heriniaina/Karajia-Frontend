<template>
    <h1>Register</h1>
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
    <button type="button" @click="register" class="btn btn-primary me-3">Register</button>
    <button type="button" @click="signInWithGoogle" class="btn btn-primary">Sign in with Google</button>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")

const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
        console.log("Successfully registered");
        router.push('/feed') //redirect
    }).catch((error) => {
        console.log(error.code);
        alert(error.message);
    })

}

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result.user);
        router.push('/feed');
    })
    .catch((error) => {
        console.log(error.code);
        alert(error.message);
    })
}
</script>