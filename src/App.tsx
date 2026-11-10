import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { InternshipTimeline } from './components/InternshipTimeline';
import { CertificationGallery } from './components/CertificationGallery';
import { Projects } from './components/Projects';
import { CodingProfiles } from './components/CodingProfiles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DocumentModalViewer, DocumentViewerProps } from './components/ui/DocumentModalViewer';
import { DocumentInfo, CertificateItem } from './types';
import { personalInfo } from './data/portfolioData';

export const App: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    documentType: 'Offer Letter' | 'Completion Certificate' | 'Course Certification' | 'Resume';
    filePath: string;
    issueDate?: string;
    issuer?: string;
    signatory?: string;
    credentialId?: string;
    verificationUrl?: string;
    notes?: string;
    discrepancyAlert?: string;
  }>({
    isOpen: false,
    title: '',
    documentType: 'Completion Certificate',
    filePath: '',
  });

  const handleOpenResumeModal = () => {
    setModalState({
      isOpen: true,
      title: `${personalInfo.name} — Official Resume`,
      subtitle: 'Computer Science Engineering | Full-Stack Developer',
      documentType: 'Resume',
      filePath: personalInfo.resumeFile,
      issuer: 'Roshini A (Official Resume Document)',
      issueDate: 'Academic Year 2024–2028',
      notes: 'Official verified resume document. Click Download to save original copy.',
    });
  };

  const handleViewInternshipDocument = (
    doc: DocumentInfo,
    company: string,
    role: string,
    discrepancy?: string
  ) => {
    const docLabel =
      doc.type === 'offer_letter' ? 'Offer Letter' : 'Completion Certificate';

    setModalState({
      isOpen: true,
      title: `${company} — ${docLabel}`,
      subtitle: role,
      documentType: doc.type === 'offer_letter' ? 'Offer Letter' : 'Completion Certificate',
      filePath: doc.filePath,
      issueDate: doc.date,
      issuer: doc.issuer || company,
      signatory: doc.signatory,
      credentialId: doc.idOrRef,
      verificationUrl: doc.credentialUrl,
      notes: doc.notes,
      discrepancyAlert: discrepancy,
    });
  };

  const handleViewCertificate = (cert: CertificateItem) => {
    setModalState({
      isOpen: true,
      title: cert.title,
      subtitle: cert.issuer,
      documentType: 'Course Certification',
      filePath: cert.imagePath,
      issueDate: cert.issueDate,
      issuer: cert.partner ? `${cert.issuer} (${cert.partner})` : cert.issuer,
      credentialId: cert.credentialId,
      verificationUrl: cert.verificationUrl,
      notes: cert.summary,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-canvas-950 text-slate-100 flex flex-col selection:bg-electric-600/40 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onOpenResumeModal={handleOpenResumeModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenResumeModal={handleOpenResumeModal} />
        <About onOpenResumeModal={handleOpenResumeModal} />
        <Skills />
        <Education />
        <InternshipTimeline onViewDocument={handleViewInternshipDocument} />
        <CertificationGallery onViewCertificate={handleViewCertificate} />
        <Projects />
        <CodingProfiles />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenResumeModal={handleOpenResumeModal} />

      {/* Global Document Viewer Modal */}
      <DocumentModalViewer
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={modalState.title}
        subtitle={modalState.subtitle}
        documentType={modalState.documentType}
        filePath={modalState.filePath}
        issueDate={modalState.issueDate}
        issuer={modalState.issuer}
        signatory={modalState.signatory}
        credentialId={modalState.credentialId}
        verificationUrl={modalState.verificationUrl}
        notes={modalState.notes}
        discrepancyAlert={modalState.discrepancyAlert}
      />
    </div>
  );
};

export default App;
