import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import templogo from '../assets/templogo.png';
import tempsig from '../assets/tempsig.jpg';

// Helper to convert image URL to base64
const getBase64ImageFromUrl = async (imageUrl) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  })
}

export const generateInvoice = async (order, customerInfo) => {
  const doc = new jsPDF('p', 'pt', 'a4');

  // Load images
  const logoBase64 = await getBase64ImageFromUrl(templogo);
  const sigBase64 = await getBase64ImageFromUrl(tempsig);

  // Constants
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;

  // ===== HEADER =====
  // Logo
  doc.addImage(logoBase64, 'PNG', margin, 30, 60, 60);

  // Tax Invoice Text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("TAX INVOICE", pageWidth - margin, 60, { align: 'right' });

  // Divider Line
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(margin, 100, pageWidth - margin, 100);

  // ===== CUSTOMER & INVOICE DETAILS =====
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  
  // Left Side
  doc.text("SOLD TO", margin, 120);
  doc.setFontSize(10);
  const customerName = customerInfo?.name || "CUSTOMER";
  const customerAddress = customerInfo?.address || customerInfo?.city || "GURGAON";
  doc.text(customerName.toUpperCase(), margin, 135);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  const splitAddress = doc.splitTextToSize(customerAddress.toUpperCase(), (pageWidth / 2) - margin - 10);
  doc.text(splitAddress, margin, 147);

  const addressHeight = splitAddress.length * 12; // approx 12pt per line
  const startPetricY = Math.max(167, 147 + addressHeight + 5);

  doc.setFont("helvetica", "bold");
  doc.text("PETRIC SOLUTION PRIVATE LIMITED", margin, startPetricY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("DLF PHASE 3,", margin, startPetricY + 13);
  doc.text("GURGAON, 122002", margin, startPetricY + 25);
  doc.text("PHONE: +91-8295756962", margin, startPetricY + 37);
  doc.text("GSTIN: 06AAPCP7993P1Z5", margin, startPetricY + 49);

  // Right Side
  doc.setFontSize(9);
  const invoiceId = order.invoiceId || order.id || "1335";
  const displayOrderId = order.id || invoiceId;
  const invoiceDate = order.date ? new Date(order.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
  doc.setFont("helvetica", "bold");
  doc.text(`Order ID: ${displayOrderId}`, pageWidth - margin, 120, { align: 'right' });
  doc.text(`Invoice Date: ${invoiceDate}`, pageWidth - margin, 135, { align: 'right' });
  doc.text(`Place of Supply: Gurgaon`, pageWidth - margin, 150, { align: 'right' });

  // ===== TABLE =====
  let startY = Math.max(240, startPetricY + 70);
  
  // Format table data
  const tableData = [];
  let subtotalAmount = 0;
  let totalDiscount = 0;

  order.items.forEach((item, index) => {
    const qty = item.quantity;
    const mrp = item.oldPrice || item.price; // fallback if oldPrice not available
    const discount = mrp - item.price;
    const total = item.price * qty;
    
    // Tax Calculation (assuming 18% total tax included in price for now or calculated backwards. Wait, in example:
    // MRP 2700, Discount 325, Taxable Value 2012.71, CGST 181.14, SGST 181.14, Total 2375
    // Price = 2375.
    // Let's reverse calculate assuming 18% GST (Tax = 18/118 of Total)
    const taxRate = 0.18;
    const taxableValue = total / (1 + taxRate);
    const cgst = taxableValue * 0.09;
    const sgst = taxableValue * 0.09;

    subtotalAmount += total;
    totalDiscount += (discount * qty);

    tableData.push([
      index + 1,
      item.name,
      item.weight || '-',
      `Rs.${mrp}`,
      `Rs.${discount}`,
      qty,
      `Rs.${taxableValue.toFixed(2)}`,
      `Rs.${cgst.toFixed(2)}`,
      `Rs.${sgst.toFixed(2)}`,
      `Rs.${total}`
    ]);
  });

  autoTable(doc, {
    startY: startY,
    head: [['S\nNO.', 'DESCRIPTION', 'VARIANT', 'MRP', 'DISCOUNT', 'QTY', 'TAXABLE VALUE', 'CGST (9%)', 'SGST (9%)', 'TOTAL']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      fontSize: 7
    },
    styles: {
      fontSize: 8,
      cellPadding: 4,
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
      textColor: [0, 0, 0]
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 25 },
      1: { halign: 'left' },
      2: { halign: 'center', cellWidth: 45 },
      3: { halign: 'center', cellWidth: 40 },
      4: { halign: 'center', cellWidth: 45 },
      5: { halign: 'center', cellWidth: 25 },
      6: { halign: 'center', cellWidth: 60 },
      7: { halign: 'center', cellWidth: 45 },
      8: { halign: 'center', cellWidth: 45 },
      9: { halign: 'center', cellWidth: 40 }
    },
    didDrawPage: function(data) {
      // Optional: Header/Footer for multiple pages
    }
  });

  // Calculate totals
  const totalTableY = doc.lastAutoTable.finalY;
  const couponDiscount = order.billing?.couponDiscount || 0;
  const grandTotal = subtotalAmount - couponDiscount;

  // Summary Rows
  autoTable(doc, {
    startY: totalTableY,
    body: [
      [{ content: 'Subtotal', colSpan: 3, styles: { fontStyle: 'bold', halign: 'left' } }, 
       { content: `Rs.${order.billing?.totalMRP || (subtotalAmount + totalDiscount)}`, styles: { fontStyle: 'bold', halign: 'center' } }, 
       { content: `Rs.${totalDiscount}`, styles: { fontStyle: 'bold', halign: 'center' } }, 
       { content: `${order.items.reduce((acc, item) => acc + item.quantity, 0)}`, styles: { fontStyle: 'bold', halign: 'center' } },
       { content: `Rs.${(subtotalAmount / 1.18).toFixed(2)}`, styles: { fontStyle: 'bold', halign: 'center' } },
       { content: `Rs.${((subtotalAmount / 1.18) * 0.09).toFixed(2)}`, styles: { fontStyle: 'bold', halign: 'center' } },
       { content: `Rs.${((subtotalAmount / 1.18) * 0.09).toFixed(2)}`, styles: { fontStyle: 'bold', halign: 'center' } },
       { content: `Rs.${subtotalAmount}`, styles: { fontStyle: 'bold', halign: 'center' } }
      ],
      [{ content: 'Coupon Discount', colSpan: 9, styles: { fontStyle: 'bold', halign: 'right', textColor: [200, 0, 0] } },
       { content: `- Rs.${couponDiscount}`, styles: { fontStyle: 'bold', halign: 'center', textColor: [200, 0, 0] } }
      ],
      [{ content: 'Grand Total', colSpan: 9, styles: { fontStyle: 'bold', halign: 'right', fontSize: 9 } },
       { content: `Rs.${grandTotal}`, styles: { fontStyle: 'bold', halign: 'center', fontSize: 9 } }
      ]
    ],
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 4,
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
      textColor: [0, 0, 0]
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { },
      2: { cellWidth: 45 },
      3: { cellWidth: 40 },
      4: { cellWidth: 45 },
      5: { cellWidth: 25 },
      6: { cellWidth: 60 },
      7: { cellWidth: 45 },
      8: { cellWidth: 45 },
      9: { cellWidth: 40 }
    }
  });

  const finalY = doc.lastAutoTable.finalY;

  // Number to words helper (simple version for this usecase, you can expand or import a library)
  const numberToWords = (num) => {
    // Basic implementation for Indian Rupees
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim() + ' Rupees Only';
  };

  // Amount in words row
  autoTable(doc, {
    startY: finalY,
    body: [[`Amount (in words): ${numberToWords(Math.round(grandTotal))}`]],
    theme: 'grid',
    styles: {
      fontSize: 8,
      fontStyle: 'bold',
      cellPadding: 5,
      lineWidth: 0.5,
      lineColor: [200, 200, 200],
      textColor: [0, 0, 0]
    }
  });

  const textY = doc.lastAutoTable.finalY + 40;
  
  // Signature
  doc.addImage(sigBase64, 'JPEG', pageWidth - 160, textY, 80, 40);
  
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 200, textY + 45, pageWidth - margin, textY + 45);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("AUTHORIZED SIGNATORY", pageWidth - 120, textY + 55, { align: 'center' });

  // Terms and conditions
  let termsY = textY + 80;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("TERMS AND CONDITIONS:", margin, termsY);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("1. IF YOU HAVE ANY ISSUES OR QUERIES IN RESPECT OF YOUR ORDER, PLEASE CONTACT CUSTOMER SUPPORT THROUGH THE PETRIC PLATFORM OR", margin + 10, termsY + 12);
  doc.text("DROP AN EMAIL AT INFO@PETRIC.IN", margin + 20, termsY + 22);
  
  doc.text("2. PLEASE NOTE THAT WE NEVER ASK FOR BANK ACCOUNT DETAILS SUCH AS CVV, ACCOUNT NUMBER, UPI PIN, ETC. ACROSS OUR SUPPORT CHANNELS.", margin + 10, termsY + 34);
  doc.text("FOR YOUR SAFETY, PLEASE DO NOT SHARE THESE DETAILS WITH ANYONE OVER ANY MEDIUM.", margin + 20, termsY + 44);

  // Save the PDF
  doc.save(`Invoice_${invoiceId}.pdf`);
};
