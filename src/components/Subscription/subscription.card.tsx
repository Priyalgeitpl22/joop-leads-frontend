import { Plan } from "../../redux/slice/planSlice";
import {
  SubscriptionCardBody,
  SubscriptionCardContainer,
  SubscriptionCardHeader,
  SubscriptionFeatures,
  SubscriptionPrice,
  SubscriptionSubtitle,
  SubscriptionTitle,
} from "./styled";
import checkmarkIcon from "../../assets/checkmark.png";
import closeIcon from "../../assets/cross.svg";
import { BillingPeriod, SupportType } from "./types";

const SubscriptionCard = ({
  plan,
  selectedPlanCode,
  handleSelectPlan,
  billingPeriod,
  offer,
}: {
  plan: Plan;
  selectedPlanCode: string;
  handleSelectPlan: (planCode: string) => void;
  billingPeriod: BillingPeriod;
  offer: number;
}) => {
  const supportTypes = [
    { name: SupportType.COMMUNITY, value: "Community" },
    { name: SupportType.EMAIL_24x7, value: "Email 24x7" },
    { name: SupportType.PRIORITY_EMAIL_CHAT, value: "Priority Email Chat" },
    { name: SupportType.PHONE_WHATSAPP, value: "Phone WhatsApp" },
  ];

  const getFeatureValue = (feature: {
    name: string;
    value: boolean | number | null;
  }) => {
    const featureValue = feature.value;
    let supportType: { name: SupportType; value: string | undefined } | null =
      null;

    if (
      supportTypes.some(
        (o) => o.name === (featureValue as unknown as SupportType)
      )
    ) {
      const supportValue = supportTypes.find(
        (o) => o.name === (featureValue as unknown as SupportType)
      )?.value;

      supportType = {
        name: featureValue as unknown as SupportType,
        value: supportValue,
      };
    }

    switch (featureValue) {
      case true:
        return <img src={checkmarkIcon} alt="check" />;
      case false:
        return <img src={closeIcon} alt="close" />;
      case supportType?.name as unknown as boolean | number | null:
        return (
          <>
            <img src={checkmarkIcon} alt="check" />{" "}
            <span>{supportType?.value as string} </span>
          </>
        );
      default:
        return (
          <>
            <img src={checkmarkIcon} alt="check" /> <span>{featureValue} </span>
          </>
        );
    }
  };

  const getBiilingAmount = (priceUsd: number | null) => {
    if(!priceUsd) {
      return "Free";
    }

    return billingPeriod === BillingPeriod.MONTHLY
      ? priceUsd ?? 0
      : (priceUsd ? (priceUsd * 12 * (1 - offer / 100)).toFixed(2) : 0);
  };

  return (
    plan && (
      <SubscriptionCardContainer
        isSelected={plan.code === selectedPlanCode}
        onClick={() => handleSelectPlan(plan.code)}
      >
        <SubscriptionCardHeader>
          <SubscriptionTitle>{plan.name}</SubscriptionTitle>
        </SubscriptionCardHeader>
        <SubscriptionCardBody>
          <SubscriptionSubtitle>{plan.description}</SubscriptionSubtitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SubscriptionPrice>
              $
              {getBiilingAmount(plan.priceUsd)}
              <span>
                {billingPeriod === BillingPeriod.MONTHLY ? "/month" : "/year"}
              </span>
            </SubscriptionPrice>
          </div>
          <SubscriptionFeatures>
            {plan?.featureNames?.map((feature) => (
              <p>
                {getFeatureValue(feature)}
                {feature.name}
              </p>
            ))}
          </SubscriptionFeatures>
        </SubscriptionCardBody>
      </SubscriptionCardContainer>
    )
  );
};

export default SubscriptionCard;
