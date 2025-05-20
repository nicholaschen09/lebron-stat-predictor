import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import StatPredictorForm from "@/components/stat-predictor-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <TrendingUp className="h-6 w-6" />
            <span>LeBron Stat Predictor</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="https://www.nba.com/player/2544/lebron-james" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm">
                  LeBron Stats
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                    Predict LeBron&apos;s Next NBA Season Stats
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Use our machine learning model to predict how the King will perform in the upcoming NBA season.
                    Adjust parameters to see different scenarios.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#predictor">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      Make a Prediction <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/lebron-james.png"
                  alt="LeBron James"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="predictor" className="w-full py-12 md:py-24 lg:py-32 -mt-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl flex flex-col items-center gap-8 py-12">
              <div className="w-full space-y-4 text-center">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-800">
                  ML-Powered Predictions
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Predict LeBron&apos;s Performance</h2>
                <p className="text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our model analyzes LeBron&apos;s career trajectory, age, minutes played, and team context to predict
                  his stats for the upcoming season.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-h-[450px] w-full">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Stat Predictor</CardTitle>
                    <CardDescription>
                      Adjust the parameters to see how they might affect LeBron&apos;s performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="min-h-[600px]">
                    <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                      <StatPredictorForm />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
