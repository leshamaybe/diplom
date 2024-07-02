import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";
import S3 from "aws-sdk/clients/s3.js";

const prisma = new PrismaClient();

const s3 = new S3({
    accessKeyId: "A139OCAIU0P1FNLC4GBF",
    secretAccessKey: "Wr2LCCAqLh5FaLLY42vLMOg4NmAqAaskelZkDwOs",
    endpoint: "https://s3.timeweb.cloud",
    s3ForcePathStyle: true,
    region: "ru-1",
    apiVersion: "latest",
});
const uploadParams = {
    Bucket: "52788c79-31c01cf7-fdb1-44eb-9942-3680264f6d41",
    Key: "",
    Body: "",
};

class UserService {
    async getProfile(id) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                profile: true,
                settings: true,
            },
        });

        return { ...user.profile, settings: user.settings };
    }
    async changeProfile(formData, me) {
        const updateData = {};

        if (formData.firstName) {
            updateData.firstName = formData.firstName;
        }
        if (formData.lastName) {
            updateData.lastName = formData.lastName;
        }
        if (formData.bio) {
            updateData.bio = formData.bio;
        }
        if (formData.name) {
            updateData.name = formData.name;
        }
        if (formData.phone) {
            updateData.phone = formData.phone;
        }
        if (formData.avatarUrl) {
            const avatarBuffer = Buffer.from(
                formData.avatarUrl.split(",")[1],
                "base64"
            );

            uploadParams.Key = `${me}_${Date.now()}_avatar.jpg`;
            uploadParams.Body = avatarBuffer;
            const s3Response = await s3.upload(uploadParams).promise();

            updateData.avatarUrl = s3Response.Location;
        }

        const profile = await prisma.profile.update({
            where: {
                user_id: me,
            },
            data: updateData,
        });

        return profile;
    }
}

export default new UserService();
