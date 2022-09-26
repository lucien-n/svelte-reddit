<script>
  import { Link } from "svelte-navigator";
  import MiniProfile from "./user/MiniProfile.svelte";

  export let user;
</script>

<nav class="navbar mb-3" aria-label="main navigation">
  <div class="navbar-brand">
    <Link class="navbar-item" to="/">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/498px-Svelte_Logo.svg.png?20191219133350"
        alt=""
      />
      edit</Link
    >
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">
      <Link class="navbar-item" to="/">Home</Link>
      <Link class="navbar-item" to="/r">Subs</Link>
      <Link class="navbar-item" to="/submit">New Post</Link>
    </div>

    <div class="navbar-end">
      {#if $user}
        <Link class="navbar-item" to="/u/{$user.uid}">
          <MiniProfile user={$user} />
        </Link>
      {:else}
        <Link class="navbar-item" to="/login">Sign In</Link>
      {/if}
    </div>
  </div>
</nav>
