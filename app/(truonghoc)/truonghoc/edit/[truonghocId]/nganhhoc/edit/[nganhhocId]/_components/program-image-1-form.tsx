"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProgramFileUpload from "./program-file-upload";

interface ProgramImage1FormProps {
  imageUrl: string | null;
  truonghocId: string;
  nganhhocId: string;
}

export const formImageSchema = z.object({
  Image1: z.string().min(1, {
    message: "Yêu cầu chọn một hình ảnh",
  }),
});

const ProgramImage1Form = ({
  imageUrl,
  truonghocId,
  nganhhocId,
}: ProgramImage1FormProps) => {
  const router = useRouter();

  const [isEditting, setIsEditting] = useState(false);

  const toggleEdit = () => {
    setIsEditting((current) => !current);
  };

  const onSubmit = async (values: z.infer<typeof formImageSchema>) => {
    try {
      await axios.patch(
        `/api/schools/${truonghocId}/programs/${nganhhocId}`,
        values
      );
      toast.success("Cập nhật ngành học thành công");
      toggleEdit();
    } catch (error) {
      toast.error("Cập nhật ngành học thất bại");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-background rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Hình ảnh 1
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditting && <>Hủy</>}
          {!isEditting && !imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Thêm hình ảnh
            </>
          )}
          {!isEditting && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Chọn hình ảnh
            </>
          )}
        </Button>
      </div>
      {!isEditting &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}

      {isEditting && (
        <div>
          <ProgramFileUpload
            endpoint="schoolBackground"
            onChange={(url) => {
              if (url) {
                onSubmit({ Image1: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Khuyến khích sử dụng hình ảnh có tỷ lệ kích thước là 16:9
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramImage1Form;
