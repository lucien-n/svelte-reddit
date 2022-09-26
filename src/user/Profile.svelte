<script>
  import { auth, db } from "../firebase";

  export let user;
  export let target_uid;

  async function getTargetData() {
    const doc = await db.collection("users").doc(target_uid).get();
    const snapshot = doc.data();
    return snapshot;
  }

  let target = getTargetData();
</script>

{#await target}
  <h1 style="text-align: center;">Fetching target user data</h1>
{:then target}
  <h1>{target.displayName}</h1>
  {#if user.uid == target_uid}
    <button
      class="button"
      on:click={() => {
        auth.signOut();
      }}>Logout</button
    >
  {/if}
{/await}
