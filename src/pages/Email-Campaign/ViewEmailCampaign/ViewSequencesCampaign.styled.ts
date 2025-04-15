import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: #f9f9fb;
  padding: 40px 20px;
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const TextContainer = styled.div`
  text-align: center;
  max-width: 570px;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #35495c;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.6;
`;