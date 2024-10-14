declare module '*.jsx' {
    import React from 'react';
    const Component: React.FC<Record<string, unknown>>;
    export default Component;
}