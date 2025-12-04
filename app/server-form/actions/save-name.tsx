"use server";

export async function saveNameAction(formData: FormData) {
  const name = formData.get("name") as string;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("Saving name:", { name });

  return ({ ok: true });
}