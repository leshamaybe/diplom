import crypto from "crypto";

function encryptMessage(message, secretKey) {
    const iv = crypto.randomBytes(16); // Инициализационный вектор
    const cipher = crypto.createCipheriv("aes-256-gcm", secretKey, iv);

    let encrypted = cipher.update(message, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    return {
        iv: iv.toString("hex"),
        content: encrypted,
        tag: authTag,
    };
}

export default encryptMessage;
