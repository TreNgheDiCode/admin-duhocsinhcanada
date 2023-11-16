import getCurrentUser from "@/actions/get-current-user";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { nameTruong: string; programId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Chưa xác thực", { status: 401 });
    }

    if (!params.nameTruong) {
      return new NextResponse("Không tìm thấy mã trường học", { status: 404 });
    }

    if (!params.programId) {
      return new NextResponse("Không tìm thấy mã ngành học", { status: 404 });
    }

    const school = await db.school.findUnique({
      where: {
        id: params.nameTruong,
      },
    });

    if (!school) {
      return new NextResponse("Không tìm thấy trường học", { status: 404 });
    }

    const body = await req.json();

    const { ...values } = body;

    const program = await db.program.update({
      where: {
        id: params.programId,
        schoolId: school.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.log("PROGRAM UPDATE");
    return new NextResponse("Lỗi cập nhật ngành học", { status: 500 });
  }
}