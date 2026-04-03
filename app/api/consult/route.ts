import { NextResponse } from "next/server";

const consults = [
  {
    id: "C-1001",
    patientName: "Ava Thompson",
    doctor: "Dr. Lee",
    type: "Follow-up",
    scheduledAt: "2026-04-03 09:00",
    status: "Completed"
  },
  {
    id: "C-1002",
    patientName: "Noah Kim",
    doctor: "Dr. Johnson",
    type: "Initial",
    scheduledAt: "2026-04-03 09:30",
    status: "Pending"
  },
  {
    id: "C-1003",
    patientName: "Emma Chen",
    doctor: "Dr. Patel",
    type: "Review",
    scheduledAt: "2026-04-03 10:00",
    status: "Completed"
  },
  {
    id: "C-1004",
    patientName: "Lucas Garcia",
    doctor: "Dr. Lee",
    type: "Initial",
    scheduledAt: "2026-04-03 10:30",
    status: "Cancelled"
  },
  {
    id: "C-1005",
    patientName: "Mia Roberts",
    doctor: "Dr. Patel",
    type: "Follow-up",
    scheduledAt: "2026-04-03 11:15",
    status: "Completed"
  }
] as const;

export async function GET() {
  return NextResponse.json(consults);
}
