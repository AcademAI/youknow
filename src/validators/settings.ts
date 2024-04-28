import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

export const profileSettingsSchema = z.object({
  name: z.string().max(50).optional(),
  bio: z.string().max(250).optional(),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_UPLOAD_SIZE;
    }, "Файл более 2MB")
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Поддерживаемые форматы: png, jpeg, gif"),
});
