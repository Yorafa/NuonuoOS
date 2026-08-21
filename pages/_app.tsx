import { type AppProps } from "next/app";
import { memo } from "react";
import { RenderCostTracker } from "components/system/RenderCostProfiler";
import { ErrorBoundary } from "components/pages/ErrorBoundary";
import Metadata from "components/pages/Metadata";
import StyledApp from "components/pages/StyledApp";
import { FileSystemProvider } from "contexts/fileSystem";
import { LanguageProvider } from "contexts/language";
import { MenuProvider } from "contexts/menu";
import { ProcessProvider } from "contexts/process";
import { SessionProvider } from "contexts/session";
import { ViewportProvider } from "contexts/viewport";

const App = ({ Component: Index, pageProps }: AppProps): React.ReactElement => (
  <RenderCostTracker id="app">
    <ViewportProvider>
      <LanguageProvider>
        <ProcessProvider>
          <FileSystemProvider>
            <SessionProvider>
              <ErrorBoundary>
                <Metadata />
                <StyledApp>
                  <MenuProvider>
                    <Index {...pageProps} />
                  </MenuProvider>
                </StyledApp>
              </ErrorBoundary>
            </SessionProvider>
          </FileSystemProvider>
        </ProcessProvider>
      </LanguageProvider>
    </ViewportProvider>
  </RenderCostTracker>
);

export default memo(App);
