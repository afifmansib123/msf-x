import Link from 'next/link';
import {useRouter} from 'next/router';


export default function Package({ children }) {
  const router = useRouter();  
  const menuItems = [
    {
      href: "/",
      title: "Homepage",
    },
    {
      href: "/about",
      title: "About",
    },
    {
      href: "/contact",
      title: "Contact",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row flex-1">
      <aside className="bg-fuchsia-100 w-full md:w-60">
        <nav>
          <ul>
            {menuItems.map(({ href, title }) => (
              <li className="m-2" key={title}>
                <Link href={href}>
                  <a
                    className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer`}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
