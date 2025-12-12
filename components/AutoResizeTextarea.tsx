import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

type AutoResizeTextareaProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>((props, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const { value } = props;

    // This exposes the internal textarea DOM node to the parent component via the ref
    useImperativeHandle(ref, () => internalRef.current!, []);

    useEffect(() => {
        const textarea = internalRef.current;
        if (textarea) {
            // Reset height to 'auto' to allow the textarea to shrink if content is removed.
            // This is more reliable than '0px' for calculating the new scrollHeight across browsers.
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            
            // Set the new height to the scrollHeight. The CSS `max-height` property,
            // which is already defined for this element, will automatically constrain
            // this value, and `overflow-y: auto` will engage the scrollbar if needed.
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [value, props.placeholder]); // Depend on value and placeholder for accurate sizing.

    return <textarea ref={internalRef} {...props} />;
});

export default AutoResizeTextarea;