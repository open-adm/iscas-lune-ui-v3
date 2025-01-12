import { useRouter } from "next/navigation";

export function useNavigateApp() {
  const router = useRouter();

  function navigate(url?: string) {
    if (url) {
      router.replace(url);
    }
  }

  return {
    navigate,
  };
}
