import { useEffect } from "react";

export const useDisableBodyScroll = (open: boolean) => {
  useEffect(() => {
    //console.log(open);
    if (open) {
      //console.log("holly shit");
      const body = document.querySelector("html") as HTMLElement;
      body.style.overflow = "hidden";
      console.log(document.body.style.overflow);
    } else {
      //console.log("moklly, shit");
      const body = document.querySelector("html") as HTMLElement;
      body.style.overflow = "auto";
      //console.log(document.body.style.overflow);
    }
  }, [open]);
};
