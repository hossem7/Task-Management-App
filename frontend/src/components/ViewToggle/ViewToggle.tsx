import React from 'react';
import Segmented from 'antd/es/segmented';
import styled from 'styled-components';

export type ViewMode = 'list' | 'board';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ToggleWrapper = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: center;
`;

export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onChange }) => {
  return (
    <ToggleWrapper>
      <Segmented
        options={[
          { label: 'List View', value: 'list' },
          { label: 'Board View', value: 'board' },
        ]}
        value={mode}
        onChange={(value) => onChange(value as ViewMode)}
      />
    </ToggleWrapper>
  );
};