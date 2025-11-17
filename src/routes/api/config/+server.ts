
import { json } from '@sveltejs/kit';
import { getConfig } from '$lib/server/minio.server'; 


export async function GET() {
    try {
        // Gọi hàm lấy config (từ file minio.server.ts)
        const config = await getConfig();

        // Trả về dữ liệu dạng JSON
        return json(config);

    } catch (error) {
        console.error("API Error:", error);
        // Trả về lỗi nếu có sự cố
        return json({ error: 'Failed to fetch configuration' }, { status: 500 });
    }
}