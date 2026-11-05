import { ProjectItem } from "./types";

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-tumweb",
    title: "TumWeb (ตำเว็บ)",
    subtitle: "Modern Web Platform & Live Works Showcase",
    category: "Web Agency / Studio",
    year: "2025 - Present",
    description:
      "สตูดิโอรับทำเว็บไซต์ธุรกิจ Landing Page, เว็บบริษัท, ร้านค้าออนไลน์ e-Commerce และระบบเฉพาะทาง รองรับมือถือ 100% พร้อมคลังผลงานจริงที่ใช้งานได้ทันที",
    longDescription:
      "TumWeb (ตำเว็บ) แพลตฟอร์มสตูดิโอและคลังรวมผลงานเว็บไซต์จริง (Live Production Showcase) ครอบคลุมระบบสั่งอาหาร JodMenu (QR Menu), ระบบคลินิกเบาหวาน รพ.สิเกา (Next.js + NestJS), เว็บประมูลงานศิลปะ Artbid, และเว็บประกันรถยนต์ MSIG Smart Mile ทุกระบบพัฒนาด้วย Next.js, TypeScript และ Modern Web Stack โหลดไว 98+ PageSpeed และโครงสร้าง SEO",
    metrics: [
      { label: "Live Client Works", value: "6+ Systems" },
      { label: "PageSpeed Score", value: "98/100" },
      { label: "Starting Price", value: "฿4,900" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "SEO Architecture", "Node.js", "Cloud VPS"],
    accentColor: "#F24E1E",
    liveUrl: "https://tumweb.kriptnet.com/",
    repoUrl: "https://tumweb.kriptnet.com/works",
    architectureNotes: [
      "รวมผลงานจริง: ระบบสั่งอาหาร JodMenu (QR Menu), คลินิกเบาหวาน รพ.สิเกา, เว็บประมูล Artbid, และ MSIG Smart Mile",
      "สถาปัตยกรรม Next.js App Router พร้อม Server-Side Rendering (SSR) โหลดเร็วฉับไว",
      "มีหน้าคลังผลงานทั้งหมด (Live Works) ให้ทดลองเข้าชมระบบจริงได้ที่ https://tumweb.kriptnet.com/works",
    ],
    featured: true,
  },
  {
    id: "proj-fastwork-wedevelop",
    title: "Fastwork Profile (@wedevelop)",
    subtitle: "Verified Full-Stack Web Developer & Freelancer",
    category: "Freelance / Verified Pro",
    year: "2025 - Present",
    description:
      "บริการรับทำเว็บไซต์ พัฒนาระบบหลังบ้าน และรับตัดเว็บจาก Figma เป็นเว็บจริงที่ใช้งานได้ทุกหน้าจอ มีตัวตนยืนยันบน Fastwork พร้อมการันตีส่งงานตรงเวลา 100%",
    longDescription:
      "โปรไฟล์ฟรีแลนซ์ NusPeerapat (@wedevelop) บนแพลตฟอร์ม Fastwork ประเทศไทย ให้บริการพัฒนา Full-Stack Web Development, ออกแบบฐานข้อมูลและระบบหลังบ้าน API, และบริการแปลงดีไซน์ Figma เป็น Responsive Code คุณภาพสูง รองรับทุกขนาดหน้าจอ ทักแชทเพื่อปรึกษาและขอใบเสนอราคาได้โดยตรง",
    metrics: [
      { label: "Platform", value: "Fastwork.co" },
      { label: "Figma to Code", value: "Pixel Perfect" },
      { label: "Client Rating", value: "100% Trust" },
    ],
    tech: ["Figma to Code", "React / Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Database / API"],
    accentColor: "#0D99FF",
    liveUrl: "https://fastwork.com/th/user/wedevelop",
    repoUrl: "https://fastwork.com/th/user/wedevelop",
    architectureNotes: [
      "รับแปลงดีไซน์ Figma / Adobe XD เป็นเว็บไซต์จริงที่ลื่นไหล รองรับมือถือและเดสก์ท็อป",
      "พัฒนาระบบหลังบ้าน (Backend API), ฐานข้อมูล, และระบบจัดการข้อมูลตามความต้องการ",
      "จ้างงานและพูดคุยอย่างปลอดภัยผ่านระบบคุ้มครองของ Fastwork ประเทศไทย",
    ],
    featured: true,
  },
];
