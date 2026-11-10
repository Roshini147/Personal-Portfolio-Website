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
import { Global3DBackground } from './components/3d/Global3DBackground';
import { DocumentModalViewer } from './components/ui/DocumentModalViewer';
import { DocumentInfo, CertificateItem } from './types';
import { personalInfo } from './data/portfolioData';

export const App: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    documentType: string;
    filePath: string;
    issueDate?: string;
    issuer?: string;
    signatory?: string;
    credentialId?: string;
    verificationUrl?: string;
    notes?: string;
  }>({
    isOpen: false,
    title: '',
    documentType: 'Document',
    filePath: '',
  });

  const handleOpenResumeModal = () => {
    setModalState({
      isOpen: true,
      title: `${personalInfo.name} — Resume`,
      subtitle: 'Computer Science Engineering | Full-Stack Developer',
      documentType: 'Resume',
      filePath: personalInfo.resumeFile,
      issuer: 'Roshini A',
      issueDate: '2024–2028',
    });
  };

  const handleViewInternshipDocument = (
    doc: DocumentInfo,
    company: string,
    role: string
  ) => {
    setModalState({
      isOpen: true,
      title: `${company} — Completion Certificate`,
      subtitle: role,
      documentType: 'Completion Certificate',
      filePath: doc.filePath,
      issueDate: doc.date,
      issuer: doc.issuer || company,
      signatory: doc.signatory,
      credentialId: doc.idOrRef,
      verificationUrl: doc.credentialUrl,
      notes: doc.notes,
    });
  };

  const handleViewCertificate = (cert: CertificateItem) => {
    setModalState({
      isOpen: true,
      title: cert.title,
      subtitle: cert.issuer,
      documentType: 'Certificate',
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
    <div className="relative min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-white overflow-x-hidden font-sans">
      {/* 3D Animated Background across entire website */}
      <Global3DBackground />

      {/* Navigation */}
      <Navbar onOpenResumeModal={handleOpenResumeModal} />

      {/* Main Sections */}
      <main className="relative z-10 flex-grow">
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

      {/* Interactive Document Viewer Modal */}
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
      />
    </div>
  );
};

export default App;
