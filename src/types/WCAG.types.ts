import { SanityDoc, SanityRef } from "./Sanity.types"
import { ExpandType } from "./utils.types"

type Base = {
  id: number,
  name: string,
  description: string,
}

export type Principle = "Perceible" | "Operable" | "Understandable" | "Robust"

export type Guideline = ExpandType<SanityDoc & Base & {
  principleRef: SanityRef
}>

export type Criterion = ExpandType<SanityDoc & Base & {
  benefits: string[],
  guidelineRef: SanityRef,
  justification: string,
  level: "A" | "AA" | "AAA",
  notes: string,
}>
