import { HOME_ROUTE_BASE } from "@/const/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * App entry page at route '/'.
 * In here, we do nothing other than redirect to the home page.
 */
export default function FunAppEntryIndex() {
  const router = useRouter();
  useEffect(() => {
    router.push(HOME_ROUTE_BASE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (<></>);
}