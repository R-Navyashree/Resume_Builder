import { useResume } from "@/contexts/ResumeContext";
import AppNavbar from "@/components/app/AppNavbar";
import LivePreviewPanel from "@/components/app/LivePreviewPanel";

const PreviewPage = () => {
  const { data } = useResume();

  const hasContent = data.personal.name || data.summary || data.experience.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppNavbar />

      <main className="flex-1 flex justify-center py-10 px-4 bg-secondary/10">
        {!hasContent ? (
          <div className="text-center mt-20">
            <p className="text-muted-foreground font-mono text-sm">No resume data yet. Go to Builder first.</p>
          </div>
        ) : (
          <div className="w-full max-w-[800px] flex justify-center">
            <div className="scale-[0.85] origin-top md:scale-100">
              <LivePreviewPanel data={data} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PreviewPage;
