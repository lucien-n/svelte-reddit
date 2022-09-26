<script>
  import { auth, db } from "./firebase";
  import { authState } from "rxfire/auth";
  import { Router, Route } from "svelte-navigator";
  import NavigationBar from "./NavigationBar.svelte";
  import Home from "./Home.svelte";
  import Login from "./auth/Login.svelte";
  import Profile from "./user/Profile.svelte";
  import PostCreate from "./post/PostCreate.svelte";

  let user = authState(auth);
</script>

<main style="height: 100%;">
  <Router>
    <NavigationBar {user} />
    <div class="columns">
      <div class="column is-four-fifths is-offset-one-fifth">
        <Route path="/">
          <Home user={$user} />
        </Route>

        <Route path="login">
          <Login />
        </Route>

        <Route path="/submit">
          <PostCreate user={$user} />
        </Route>

        <Route path="u/:uid" let:params>
          <Profile user={$user} target_uid={params.uid} />
        </Route>
      </div>
    </div>
  </Router>
</main>