import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">What is this?</h1>
      
      <div className="mb-6">
        <Image
          src="/placeholder.svg?height=360&width=640"
          alt="Profile picture"
          width={640}
          height={360}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      
      <div className="space-y-4 mb-8">
        <p>
          このプログラムは、テキストを入力すると、自動的に段落に分割して整形するものです。
          
        </p>
        <p>
          私の旅は5年前に始まり、それ以来、さまざまなプロジェクトに携わってきました。
          常に新しいことを学び、挑戦し、成長することを心がけています。
          このブログでは、私の経験や学んだことを共有し、他の人々にインスピレーションを与えたいと思っています。
        </p>
        <p>
          仕事以外では、写真撮影や旅行を楽しんでいます。新しい場所を訪れ、異なる文化に触れることで、
          クリエイティブな視点が広がると信じています。
        </p>
      </div>
      
      <div className="text-center">
        <Button>お問い合わせ</Button>
      </div>
    </div>
  )
}