import styled from "styled-components";

export const EmailProviderWrap = styled.span<{ $size?: number }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme, $size = 20 }) => ($size <= 18 ? theme.typography.fontSize.xs : theme.typography.fontSize.sm)};
`;

export const EmailProviderIcon = styled.img`
  display: block;
  flex-shrink: 0;
`;
