import crypto from "crypto";

function decryptMessage(encryptedMessage, secretKey) {
    const iv = Buffer.from(encryptedMessage.iv, "hex");
    const content = Buffer.from(encryptedMessage.content, "hex");
    const tag = Buffer.from(encryptedMessage.tag, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", secretKey, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(content, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

export default decryptMessage;
