import { NextResponse } from "next/server"

// Mock projects data (in production, fetch from MongoDB)
const projectsData = [
  {
    id: 1,
    title: "bKash SIDA - AI Social Media Analytics",
    description: "NLP pipeline for multi-class topic classification, NER and sentiment analysis for bKash social channels.",
    tech: ["Python", "Transformers", "Pandas", "Scikit-learn", "LangChain"],
    image: "/projects/bkash-sida.png",
  },
  {
    id: 2,
    title: "CTTC Social Media Monitoring System",
    description: "High-performance data API and analytics platform using Django, Elasticsearch and MinIO.",
    tech: ["Django", "Elasticsearch", "PostgreSQL", "MinIO"],
    image: "/projects/cttc.png",
  },
  {
    id: 3,
    title: "Vault Alarm & Monitoring — Jamuna Bank",
    description: "IoT-enabled vault alarm and monitoring across branches with DSC DLS and Sur-Gard integration.",
    tech: ["DSC DLS", "Sur-Gard", "Kronos", "IoT"],
    image: "/projects/vault-alarm.png",
  },
  {
    id: 4,
    title: "BGB E-Recruitment Platform",
    description: "Secure recruitment system with payment processing, 2FA and RBAC for Border Guard Bangladesh.",
    tech: ["Django", "React", "MySQL", "Docker"],
    image: "/projects/bgb-recruitment.png",
  },
  {
    id: 5,
    title: "AV Automation — Huawei / Unilever",
    description: "Crestron automation, Dante audio networks and Xilica DSP integration for enterprise AV.",
    tech: ["Crestron SIMPL", "Dante", "Xilica"],
    image: "/projects/av-automation.png",
  },
  {
    id: 6,
    title: "ZKTeco Access Control",
    description: "Enterprise biometric access control integration with PostgreSQL and RBAC.",
    tech: ["ZKTeco", "PostgreSQL", "RBAC", "Biometrics"],
    image: "/projects/zkteco.png",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: projectsData,
  })
}
