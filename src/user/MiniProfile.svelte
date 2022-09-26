<script>
  import { db } from "../firebase";

  export let user;

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  async function getUserInfo() {
    const doc = await db.collection("users").doc(user.uid).get();
    const snapshot = doc.data();

    return snapshot;
  }

  const userInfo = getUserInfo();
</script>

<article class="media p-0">
  <div class="media-left"  style="background-color: rgba(0, 0, 0, 0);">
    <figure class="image is-32x32">
      <img
        src="https://styles.redditmedia.com/t5_2t9prw/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfNDY2YTMzMDg4N2JkZjYyZDUzZjk2OGVhODI0NzkzMTUwZjA3NzYyZV8xMDk2MTc_rare_e5e290fc-5da7-4004-93b4-0fc4de2fa43d-headshot.png?width=256&height=256&frame=1&crop=256:256,smart&s=392b5b608d39696e5728ca3eea7e21ea85ad49a6"
        alt=""
      />
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
      {#await userInfo}
        <p>Fetching user info</p>
      {:then userInfo}
        <p>
          <strong>{user.displayName}</strong> <br />
          {formatter.format(userInfo.karma)} karma
        </p>
      {/await}
    </div>
  </div>
</article>
