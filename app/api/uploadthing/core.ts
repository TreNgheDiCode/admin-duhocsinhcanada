import getCurrentUser from "@/actions/get-current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Uploadthing Unauthorized");
  }

  return currentUser;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  userImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  userAttachment: f(["text", "image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  userIdentifier: f({ image: { maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  schoolBackground: f({
    image: {
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  logoImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
