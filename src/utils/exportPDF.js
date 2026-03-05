import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Exports a DOM element to a PDF file.
 * @param {string} elementId - The ID of the element to export.
 * @param {string} filename - The name of the PDF file to save.
 */
export const exportToPDF = async (elementId, filename = 'budget_rapport.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID "${elementId}" not found.`);
        return;
    }

    try {
        // Select all elements with the 'no-pdf' class and hide them
        const noPdfElements = element.querySelectorAll('.no-pdf');
        noPdfElements.forEach(el => el.style.display = 'none');

        const canvas = await html2canvas(element, {
            scale: 2, // Better resolution
            useCORS: true,
            logging: false,
            backgroundColor: '#0f172a', // Exact background color from Budget.jsx (bg-slate-900)
            onclone: (clonedDoc) => {
                // html2canvas doesn't support oklch() colors (Tailwind 4 default)
                // We need to convert them to rgb() in the cloned document
                const elements = clonedDoc.getElementsByTagName('*');
                for (let i = 0; i < elements.length; i++) {
                    const el = elements[i];
                    const style = window.getComputedStyle(el);

                    // Properties that might contain colors
                    const colorProps = ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke', 'backgroundImage'];

                    colorProps.forEach(prop => {
                        const val = style.getPropertyValue(prop);
                        if (val && val.includes('oklch')) {
                            // Forced conversion: use a temporary element to let the browser resolve oklch to rgb
                            try {
                                const temp = clonedDoc.createElement('div');
                                temp.style.color = val;
                                clonedDoc.body.appendChild(temp);
                                const resolvedColor = window.getComputedStyle(temp).color;
                                el.style[prop] = resolvedColor;
                                clonedDoc.body.removeChild(temp);
                            } catch (e) {
                                // Fallback to a safe color if conversion fails
                                if (prop === 'backgroundColor') el.style[prop] = '#1e293b';
                                if (prop === 'color') el.style[prop] = '#ffffff';
                            }
                        }
                    });

                    // Handle gradients specifically as they are often the culprit
                    const bgImg = style.backgroundImage;
                    if (bgImg && bgImg.includes('oklch')) {
                        // Very simplified: replace oklch with hex/rgb by trying to regex them out
                        // This is harder, so we might just simplify gradients for PDF
                        el.style.backgroundImage = 'none';
                        el.style.backgroundColor = '#0f172a'; // Fallback to solid dark for gradients
                    }
                }
            }
        });

        // Re-show 'no-pdf' elements
        noPdfElements.forEach(el => el.style.display = '');

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Handle multi-page if necessary (simple version)
        let heightLeft = pdfHeight;
        let position = 0;
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(filename);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
