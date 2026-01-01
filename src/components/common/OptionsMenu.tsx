import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MoreHorizontal } from 'lucide-react';

export interface MenuItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface OptionsMenuProps {
  items: (MenuItemType | 'divider')[];
  triggerIcon?: React.ReactNode;
  position?: 'left' | 'right';
}

const MenuWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.border.dark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const MenuDropdown = styled.div<{ $position: 'left' | 'right'; $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  ${({ $position }) => ($position === 'right' ? 'right: 0;' : 'left: 0;')}
  min-width: 220px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const MenuItem = styled.button<{ $danger?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  border: none;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colors.error.main : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  text-align: left;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${({ theme, $danger }) =>
      $danger ? `${theme.colors.error.main}10` : theme.colors.background.tertiary};
  }

  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.error.main : theme.colors.text.secondary};
    flex-shrink: 0;
  }

  &:hover svg {
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.error.dark : theme.colors.text.primary};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const OptionsMenu: React.FC<OptionsMenuProps> = ({
  items,
  triggerIcon,
  position = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (item: MenuItemType) => {
    if (item.disabled) return;
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <MenuWrapper ref={menuRef}>
      <TriggerButton
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {triggerIcon || <MoreHorizontal size={20} />}
      </TriggerButton>

      <MenuDropdown $position={position} $isOpen={isOpen} role="menu">
        {items.map((item, index) => {
          if (item === 'divider') {
            return <Divider key={`divider-${index}`} />;
          }

          return (
            <MenuItem
              key={item.id}
              onClick={() => handleItemClick(item)}
              $danger={item.danger}
              $disabled={item.disabled}
              disabled={item.disabled}
              role="menuitem"
            >
              {item.icon}
              {item.label}
            </MenuItem>
          );
        })}
      </MenuDropdown>
    </MenuWrapper>
  );
};

export default OptionsMenu;

