```js
/* ================= WALLET.JS ================= */

/*
  Logged-in user
  localStorage se user ID li jayegi
*/

const walletUser = JSON.parse(
  localStorage.getItem("user")
);


/* ================= SUPABASE CONNECTION ================= */

const walletClient = supabase.createClient(
  "https://katbdbzoufiblnnsoxkk.supabase.co",
  "sb_publishable_--fdpQMmSlUyt2ywjUErgQ_LXGvQH-a"
);


/* ================= LOGIN CHECK ================= */

if (!walletUser || !walletUser.id) {

  console.log("User login information not found.");

  /*
    Agar login nahi hai to login page par bhejo
  */

  window.location.href = "index.html";

}


/* ================= LOAD USER + WALLET ================= */

async function loadWallet() {

  if (!walletUser || !walletUser.id) {
    return;
  }

  try {

    /*
      Supabase login table se
      ID aur balance dono read honge
    */

    const { data, error } = await walletClient
      .from("login")
      .select("id,balance")
      .eq("id", walletUser.id)
      .single();


    /* ================= ERROR ================= */

    if (error) {

      console.error(
        "Wallet error:",
        error.message
      );

      return;
    }


    /* ================= NO USER ================= */

    if (!data) {

      console.log(
        "User not found in Supabase."
      );

      return;
    }


    /* ================= USER ID ================= */

    const userId = data.id;


    /* ================= BALANCE ================= */

    const balance = data.balance ?? 0;


    /* ================= SHOW USER ID ================= */

    const userIdElement =
      document.getElementById("userId");

    if (userIdElement) {

      userIdElement.innerText =
        "ID: " + userId;

    }


    /* ================= SHOW BALANCE ================= */

    const walletBalanceElement =
      document.getElementById("walletBalance");

    if (walletBalanceElement) {

      walletBalanceElement.innerText =
        "₹ " + balance;

    }


    /* ================= OPTIONAL #balance ================= */

    const balanceElement =
      document.getElementById("balance");

    if (balanceElement) {

      balanceElement.innerText =
        "₹ " + balance;

    }

  }

  catch (error) {

    console.error(
      "Wallet loading failed:",
      error
    );

  }

}


/* ================= OPEN WALLET ================= */

function openWallet() {

  window.location.href =
    "wallet.html";

}


/* ================= START ================= */

loadWallet();


/* ================= AUTO REFRESH ================= */

/*
  Har 60 seconds mein
  Supabase se latest ID + balance read hoga.
*/

setInterval(
  loadWallet,
  60000
);
```
