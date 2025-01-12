import Image from "next/image";

interface propsImageApp {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

export function ImageApp(props: propsImageApp) {
  return (
    <Image
      height={props.height}
      width={props.width}
      src={props.src}
      className={props.className}
      alt={props.alt}
      priority
    />
  );
}
