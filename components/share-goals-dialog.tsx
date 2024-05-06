import html2canvas from "html2canvas";
import { Image, Loader } from "lucide-react";
import { LegacyRef, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

export const ShareGoalsDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [downloading, setDownloading] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const exportAsImage = async (element: HTMLElement, fileName: string) => {
    if (element) {
      setDownloading(true);
      try {
        const canvas = await html2canvas(element, {
          scale: 1,
          useCORS: true,
          logging: true,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          width: element.offsetWidth,
          height: element.offsetHeight,
          backgroundColor: "transparent",
        });

        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, fileName);
      } catch (error) {
      } finally {
        setDownloading(false);
      }
    }
  };

  const downloadImage = (blob: string, fileName: string) => {
    const link = document.createElement("a");
    link.style.display = "none";
    link.download = fileName;
    link.href = blob;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <Image className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span className="text-sm font-medium">Share Goal</span>
        </DialogHeader>

        <div className="relative overflow-hidden rounded-md">
          <div
            ref={elementRef as LegacyRef<HTMLDivElement>}
            className="aspect-video bg-neutral-100 dark:bg-[#070809] border rounded-lg px-8 py-6"
          >
            {children}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() =>
              exportAsImage(elementRef.current as HTMLElement, "goals.png")
            }
            className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-600/80 transition-colors duration-200 bg-blue-500 hover:bg-blue-500/80 "
          >
            {downloading ? <Loader className="animate-spin" /> : "Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
