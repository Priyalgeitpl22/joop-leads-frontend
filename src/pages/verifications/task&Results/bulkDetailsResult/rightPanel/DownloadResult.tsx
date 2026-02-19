import {
  CardContainer,
  Title,
  SelectWrapper,
  Select,
  ButtonRow,
  DownloadButton,
  SeparatorText,
  DeleteText,
  DeleteLink,
  InfoText,
  DownloadIcon,
} from "./DownloadResult.styled";

const DownloadResult = () => {
  return (
    <CardContainer>
      <Title>Download Categorized Results</Title>
      <DownloadIcon
        src="/Images/cloud-download.png"
        alt="Upload file"
        width={190}
        height={170}
      />

      <SelectWrapper>
        <Select>
          <option>All - Include all type of results</option>
          <option>Valid Only</option>
          <option>Invalid Only</option>
          <option>Safe Only</option>
        </Select>
      </SelectWrapper>

      <ButtonRow>
        <DownloadButton>Download CSV</DownloadButton>
        <SeparatorText>or</SeparatorText>
        <DownloadButton>Download XLSX</DownloadButton>
      </ButtonRow>

      <DeleteText>
        Want to delete the files permanently from our servers?{" "}
        <DeleteLink href="#">Click Here</DeleteLink>
      </DeleteText>

      <InfoText>
        All files get deleted automatically after 15 days of verification by
        default.
      </InfoText>
    </CardContainer>
  );
};

export default DownloadResult;
