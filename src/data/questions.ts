import {
  bankAlgorithms,
  bankDatabase,
  bankDs,
  bankEnglish,
  bankGa,
  bankNetworking,
  bankOops,
  bankProgramming,
  bankPython,
  bankQuant,
  bankReasoning,
  bankSecurity,
  bankShell,
  bankSql,
  bankStrings,
  bankWarehouse,
} from "@/data/banks";
import { descriptiveRcQuestions } from "@/data/descriptive";
import { descriptivePracticeRcQuestions } from "@/data/descriptive-practice";
import { paper1Hard } from "@/data/questions-paper1-hard";
import { paper1Questions } from "@/data/questions-paper1";
import { phase1HardDbSql, phase1HardRest } from "@/data/questions-phase1-hard";
import { phase1HardProg } from "@/data/questions-phase1-prog-hard";
import { phase1Questions } from "@/data/questions-phase1";
import { phase2Hard } from "@/data/questions-phase2-hard";
import { phase2Questions } from "@/data/questions-phase2";
import { pyqExtra } from "@/data/questions-pyq-extra";
import { pyqP1P1_2018 } from "@/data/questions-pyq-p1p1-2018";
import { pyqP1P1_2020 } from "@/data/questions-pyq-p1p1-2020";
import { pyqP1P1_2022 } from "@/data/questions-pyq-p1p1-2022";
import { pyqP1P1_2024 } from "@/data/questions-pyq-p1p1-2024";
import { pyqP1P1_2025 } from "@/data/questions-pyq-p1p1-2025";
import { pyqP1P2_2018 } from "@/data/questions-pyq-p1p2-2018";
import { pyqP1P2_2020 } from "@/data/questions-pyq-p1p2-2020";
import { pyqP1P2_2022 } from "@/data/questions-pyq-p1p2-2022";
import { pyqP1P2_2024 } from "@/data/questions-pyq-p1p2-2024";
import { pyqP1P2_2025 } from "@/data/questions-pyq-p1p2-2025";
import { pyqP2P2_2018 } from "@/data/questions-pyq-p2p2-2018";
import { pyqP2P2_2022 } from "@/data/questions-pyq-p2p2-2022";
import { pyqP2P2_2024 } from "@/data/questions-pyq-p2p2-2024";
import { pyqP2P2_2025 } from "@/data/questions-pyq-p2p2-2025";
import { pyqP2P2_2026 } from "@/data/questions-pyq-p2p2-2026";
import type { Question, TopicId } from "@/lib/types";

export const allQuestions: Question[] = [
  ...phase1Questions,
  ...phase1HardDbSql,
  ...phase1HardRest,
  ...phase1HardProg,
  ...phase2Questions,
  ...phase2Hard,
  ...paper1Questions,
  ...paper1Hard,
  ...descriptiveRcQuestions,
  ...pyqP1P1_2018,
  ...pyqP1P1_2020,
  ...pyqP1P1_2022,
  ...pyqP1P1_2024,
  ...pyqP1P1_2025,
  ...pyqP1P2_2018,
  ...pyqP1P2_2020,
  ...pyqP1P2_2022,
  ...pyqP1P2_2024,
  ...pyqP1P2_2025,
  ...pyqP2P2_2018,
  ...pyqP2P2_2022,
  ...pyqP2P2_2024,
  ...pyqP2P2_2025,
  ...pyqP2P2_2026,
  ...pyqExtra,
  ...bankDatabase,
  ...bankSql,
  ...bankProgramming,
  ...bankPython,
  ...bankAlgorithms,
  ...bankNetworking,
  ...bankSecurity,
  ...bankWarehouse,
  ...bankShell,
  ...bankDs,
  ...bankStrings,
  ...bankOops,
  ...bankGa,
  ...bankEnglish,
  ...bankQuant,
  ...bankReasoning,
];

export function questionsByTopic(topic: TopicId): Question[] {
  return allQuestions.filter((q) => q.topic === topic);
}

export function questionById(id: string): Question | undefined {
  return (
    allQuestions.find((q) => q.id === id) ??
    descriptivePracticeRcQuestions.find((q) => q.id === id)
  );
}
