const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

let afk = false; // AFK durumu
const userAfkTimeouts = {}; // Her kullanıcı için timeout süresi

const afkMessageCooldown = 2 * 60 * 60 * 1000; // 2 saat arayla mesaj gönderme (2 saat = 2 * 60 * 60 * 1000 ms)

client.on('ready', () => {
    console.log(`${client.user.username} olarak giriş yapıldı.`);
});

client.on('message', async (message) => {
    if (message.author.bot) return; // Botlardan gelen mesajlara yanıt verme

    // DM'de AFK mesajı göndermek için
    if (message.channel.type === 'DM') {
        const userId = message.author.id;
        const currentTime = Date.now();

        // Eğer AFK modunda ise ve belirli kullanıcı için son AFK mesajı gönderilmesinden 2 saat geçmediyse
        if (afk) {
            if (!userAfkTimeouts[userId] || currentTime - userAfkTimeouts[userId] > afkMessageCooldown) {
                // Eğer kişiyle 2 saat içinde AFK mesajı gönderilmediyse
                await message.reply("Şu anda AFK'yım, mesajını sonra yanıtlarım!"); // KAFAM GOREEE
                userAfkTimeouts[userId] = currentTime; // Kullanıcıya ait son AFK mesajı gönderilme zamanını güncelle
            }
        }
    }

    // Komut ile AFK'ya geçme
    if (message.content === "!afk") {
        afk = true;
        await message.channel.send("Şu anda AFK'yım, mesajlarınıza yanıt veremiyorum!"); // KAFANA GORE DEGİSS
    }

    // AFK'dan çıkmak için komut
    if (message.content === "!back") {
        afk = false;
        await message.channel.send("Artık AFK değilim, mesajlarınıza yanıt verebilirim!"); // KAFANA GORE DEGİS
    }
});

client.login("");  // TOKEN YAPISTIR
