import { SequenceSchedularType, SequenceType, variantDistributionType } from "./enums";

export interface Sequence {
    seq_number: number;
    seq_type: SequenceType;
    seq_delay_details: {
        delay_in_days: number;
    };
    sequence_schedular_type: SequenceSchedularType;
    seq_variants: SequenceVariant[];
    variant_distribution_type: variantDistributionType;
}

export interface SequenceVariant {
    subject: string;
    emailBody: string;
    variantLabel?: string;
}

export { SequenceSchedularType };
