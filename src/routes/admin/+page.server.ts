
import { getConfig, saveConfig } from '$lib/server/minio.server'; // Import 2 hàm từ Bước 2
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';


export const load: PageServerLoad = async () => {
    // Lấy config hiện tại để hiển thị ra editor
    console.log("Loading config for admin page...");
    const currentConfig = await getConfig();
    return {
        config: currentConfig 
    };
};


export const actions: Actions = {
    
    save: async ({ request }) => {
        const formData = await request.formData();
        const configString = formData.get('config') as string;

        if (!configString) {
            return fail(400, { success: false, error: 'Không có nội dung config.' });
        }

        let configJson;
        try {
            // Yêu cầu: Validate JSON
            configJson = JSON.parse(configString);
        } catch (e) {
            // Nếu JSON.parse lỗi -> JSON không hợp lệ
            return fail(400, { success: false, error: 'Lỗi: JSON không hợp lệ. Vui lòng sửa lại.' });
        }

        // Nếu JSON hợp lệ, lưu vào MinIO
        console.log("Saving new config to MinIO...");
        const result = await saveConfig(configJson);

        if (result.success) {
            return { success: true, message: result.message };
        } else {
            return fail(500, { success: false, error: result.message });
        }
    }
};