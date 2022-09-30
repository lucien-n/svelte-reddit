<script lang="ts">
  import { navigate } from "svelte-navigator";
  import { auth, db, googleAuthProvider } from "../firebase";

  function loginUser() {
    auth.signInWithPopup(googleAuthProvider).then((user) => {
      const userDoc = db.collection("users").doc(user.user.uid);
      userDoc.get().then((doc) => {
        if (!doc.exists) {
          userDoc.set({
            karmaPost: 0,
            karmaComment: 0,
            uid: user.user.uid,
            displayName: user.user.displayName,
            created: Date.now(),
            subs: ["seddit"]
          });
        }
      });
      navigate("/")
    });
  }
</script>

<div class="column is-two-fifths is-offset-one-fifth">
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Sign In</p>
    </div>
    <div class="card-content">
      <div class="field">
        <label class="label" for="mail">Mail</label>
        <div class="control">
          <input
            id="mail"
            type="text"
            placeholder="jhon.doe@mail.com"
            class="input"
          />
        </div>
      </div>

      <div class="field">
        <label for="password" class="label">Password</label>
        <div class="control">
          <input
            id="password"
            type="password"
            class="input"
            placeholder="********"
          />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link">Login</button>
        </div>
      </div>

      <hr />

      <button class="button" on:click={loginUser}>Sign-In with Google</button>
    </div>
  </div>
</div>
