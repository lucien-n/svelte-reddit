<script>
  import { Link } from "svelte-navigator";
  import MiniProfile from "./user/MiniProfile.svelte";
  import { fly } from "svelte/transition";
  import { db } from "./firebase";
  import { Pulse } from "svelte-loading-spinners";
  import { writable } from "svelte/store";

  export let user;

  let isActive = false;

  // async function getUserSubs() {
  //   const userDoc = await db.collection("users").doc(user.uid).get();
  //   const userDocSnapshot = userDoc.data();
  //   return userDocSnapshot !== undefined
  //     ? writable(userDocSnapshot.subs)
  //     : writable(["seddit"]);
  // }

  const userSubs = writable(["seddit", "Scaffus", "Svelte"]);
</script>

<nav class="navbar mb-3 has-background-light" aria-label="main navigation">
  <div class="navbar-brand">
    <Link class="navbar-item" to="/">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/498px-Svelte_Logo.svg.png?20191219133350"
        alt=""
      />
      eddit</Link
    >
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">
      <Link class="navbar-item" to="/">Home</Link>
      <div
        class="dropdown navbar-item"
        on:click={() => (isActive = !isActive)}
        class:is-active={isActive}
      >
        <div class="dropdown-trigger">
          <button
            class="button has-background-light"
            style="border: none;"
            aria-controls="dropdown-menu-subs"
            aria-haspopup="true"
          >
            <span>Seddit</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu-subs" role="menu">
          <div class="dropdown-content">
            {#each $userSubs as sub}
              <Link class="dropdown-item" to="r/{sub}">{sub}</Link>
            {/each}
          </div>
        </div>
      </div>
      <Link class="navbar-item" to="/submit">New Post</Link>
    </div>

    <div class="navbar-end">
      {#if $user}
        <div class="div" in:fly={{ duration: 250, y: -75 }}>
          <Link class="navbar-item" to="/u/{$user.uid}">
            <MiniProfile user={$user} />
          </Link>
        </div>
      {:else}
        <Link class="navbar-item" to="/login">Sign In</Link>
      {/if}
    </div>
  </div>
</nav>
