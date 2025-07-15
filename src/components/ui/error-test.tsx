import { useState } from 'react';
import { Button } from './button';

const ErrorTest = () => {
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
        // This will trigger the error boundary
        throw new Error('This is a test error to demonstrate the error boundary!');
    }

    return (
        <div className="p-4 border border-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Error Boundary Test</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Click the button below to trigger an error and see the error boundary in action.
            </p>
            <Button
                onClick={() => setShouldError(true)}
                variant="destructive"
                size="sm"
            >
                Trigger Error
            </Button>
        </div>
    );
};

export default ErrorTest; 