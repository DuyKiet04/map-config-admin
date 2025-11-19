
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from '$env/dynamic/private'; 

const S3_BUCKET = env.S3_BUCKET;
const S3_KEY = env.S3_KEY;
const s3Client = new S3Client({
    endpoint: env.S3_ENDPOINT,
    region: "us-east-1", 
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
    },
    forcePathStyle: true, 
});
function getDefaultConfig() {
    return {
        title: "My Map Config",
        logoUrl: "https://svelte.dev/favicon.png",
        zoom: 13,
        center: [10.7769, 106.7009], 
        baseLayers: [
            {
                name: "OpenStreetMap",
                layerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                thumbnailUrl: "https://example.com/osm-thumb.png"
            }
        ],
        overlays: [
            {
                name: "Sample WMS",
                wmsUrl: "https://example.com/wms",
                layers: "example:layer_name",
                iconUrl: "https://example.com/icon.png",
                active: true
            }
        ]
    };
}
export async function getConfig() {
    const command = new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: S3_KEY,
    });

    try {
        const response = await s3Client.send(command);
        // Đọc nội dung file
        const str = await response.Body?.transformToString();
        return JSON.parse(str || "{}");
    } catch (error) {
        // Nếu file không tồn tại , trả về config mặc định
        if (error.name === 'NoSuchKey') {
            console.warn("Config file not found. Returning default config.");
            return getDefaultConfig(); 
        }
        console.error("Error fetching config from MinIO:", error);
        throw error;
    }
}
export async function saveConfig(jsonContent: object) {
    const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: S3_KEY,
        Body: JSON.stringify(jsonContent, null, 2), 
        ContentType: "application/json", // Ghi đè file
    });
    try {
        await s3Client.send(command);
        return { success: true, message: "Cấu hình đã được lưu thành công!" };
    } catch (error) {
        console.error("Error saving config to MinIO:", error);
        return { success: false, message: "Lỗi: Không thể lưu cấu hình." };
    }
}